import { User } from './user/user.entity.js';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import * as os from 'os';
import { DataSource, QueryRunner, Repository } from 'typeorm';

const myDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'dev',
  database: 'dev',
  entities: [User],
  synchronize: false,
  extra: {
    max: 10,
  },
});

const USERS_BATCH_SIZE = 10000;
const TOTAL_USERS = 1000000;
const NUM_WORKERS: number = os.cpus().length;

async function createUsers(start: number, end: number): Promise<User[]> {
  const users = [];
  for (let i = start; i < end; i++) {
    const user = new User();
    user.firstName = `FirstName${i}`;
    user.lastName = `LastName${i}`;
    user.age = Math.floor(Math.random() * 100);
    user.gender = i % 2 === 0 ? 'male' : 'female';
    user.issues = Math.random() < 0.5;
    users.push(user);
  }
  return users;
}

async function saveUsers(users: User[], userRepository: Repository<User>, queryRunner: QueryRunner): Promise<void> {
  await queryRunner.startTransaction();
  try {
    while (users.length > 0) {
      const batch = users.splice(0, USERS_BATCH_SIZE);
      await userRepository.save(batch);
    }
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}

async function populateUsers():  Promise<void> {
  await myDataSource.initialize();
  const rangePerWorker: number = Math.ceil(TOTAL_USERS / NUM_WORKERS);
  
  const workers:  Promise<void>[] = Array.from({ length: NUM_WORKERS }, (_, index: number): Promise<void> => {
    const start: number = index * rangePerWorker;
    const end: number = Math.min(start + rangePerWorker, TOTAL_USERS);
    
    return new Promise<void>((resolve, reject): void => {
      const worker = new Worker(__filename, {
        workerData: { start, end },
      });
      
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code: number): void => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  });
  
  try {
    await Promise.all(workers);
    console.log('User population complete.');
  } catch (err) {
    console.error('Failed to populate users:', err);
  } finally {
    await myDataSource.destroy();
  }
}

if (isMainThread) {
  populateUsers().catch(console.error);
} else {
  (async (): Promise<void> => {
    try {
      const users: User[] = await createUsers(workerData.start, workerData.end);
      
      await myDataSource.initialize();
      const userRepository: Repository<User> = myDataSource.getRepository(User);
      const queryRunner: QueryRunner = myDataSource.createQueryRunner();
      
      await saveUsers(users, userRepository, queryRunner);
      await myDataSource.destroy();
      parentPort?.postMessage('done');
    } catch (err) {
      console.error(err);
      parentPort?.postMessage('error');
    }
  })();
}