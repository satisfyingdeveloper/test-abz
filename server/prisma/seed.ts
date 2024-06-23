import { PrismaClient } from '@prisma/client';
import { Faker, uk } from '@faker-js/faker';
import { Positions } from '../src/lib/constants';
import axios from 'axios';
import * as Minio from 'minio'
import {config} from 'dotenv'

config({
    path: '.env'
})

const prisma = new PrismaClient();

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

async function generatePhotos() {
    const photos = [];
    for (let i = 0; i < 45; i++) {
        const link = `https://picsum.photos/id/${i}/200/300`
        const response = await axios.get(link, { responseType: 'arraybuffer' });

        const bucket = process.env.MINIO_BUCKET_NAME;
        const objectName = `${i}.jpg`;
        const size = response.headers['content-length'];

        await minioClient.putObject(bucket, objectName, response.data, Number(size));
        const url = await minioClient.presignedGetObject(bucket, objectName, 24 * 60 * 60);

        photos.push({
            url,
            user_id: i + 1,
        });

    }
    return photos
}

function generateUkrainianMobileNumber() {
    const countryCode = '+380';
    const operatorCodes = ['50', '66', '67', '68', '73', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
    const numbers = '0123456789';

    function getRandomElement(array: string | Array<string>) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function getRandomNumbers(count: number) {
        let result = '';
        for (let i = 0; i < count; i++) {
            result += getRandomElement(numbers);
        }
        return result;
    }

    const operatorCode = getRandomElement(operatorCodes);
    const numberPart1 = getRandomNumbers(3);
    const numberPart2 = getRandomNumbers(4);

    return `${countryCode} ${operatorCode} ${numberPart1} ${numberPart2}`;
}

async function main() {
    const users = [];
    const [pictures] = await Promise.all([generatePhotos()])

    for (let i = 0; i < 45; i++) {
        const faker = new Faker({
            locale: [uk],
        });
        
        const randomValue = Math.floor(Math.random() * Object.values(Positions).length);
        const [position, position_id] = Object.entries(Positions)[randomValue];

        users.push({
            email: faker.internet.email(),
            name: faker.person.firstName(),
            position: position,
            avatar: pictures[i].url,
            position_id: position_id,
            phone: generateUkrainianMobileNumber(),
            registration_timestamp: Math.round(Date.now() / 1000),
        });
    }

    await prisma.users.createMany({ data: users });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });