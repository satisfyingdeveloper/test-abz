import { Injectable } from '@nestjs/common'
import * as Minio from 'minio'
import { ConfigService } from '@nestjs/config'
import { MemoryStoredFile } from 'nestjs-form-data'

@Injectable()
export class MinioService {
    private minioClient: Minio.Client
    private bucketName: string

    constructor(private readonly configService: ConfigService) {
        this.minioClient = new Minio.Client({
            endPoint: this.configService.get('MINIO_ENDPOINT'),
            port: this.configService.get<number>('MINIO_PORT'),
            useSSL: this.configService.get('MINIO_USE_SSL'),
            accessKey: this.configService.get('MINIO_ACCESS_KEY'),
            secretKey: this.configService.get('MINIO_SECRET_KEY')
        })
        this.bucketName = this.configService.get('MINIO_BUCKET_NAME')
    }

    async createBucketIfNotExists() {
        const bucketExists = await this.minioClient.bucketExists(this.bucketName)
        if (!bucketExists) {
            await this.minioClient.makeBucket(this.bucketName, 'eu-west-1')
        }
    }

    async uploadFile(file: MemoryStoredFile) {
        const fileName = `${Date.now()}-${file.originalName}`
        await this.minioClient.putObject(
            this.bucketName,
            fileName,
            file.buffer,
            file.size
        )
        const {url} = await this.getFileUrl(fileName)
        return {
            url,
            file_name: fileName
        }
    }

    async getFileUrl(fileName: string) {
        return { url: await this.minioClient.presignedUrl('GET', this.bucketName, fileName, 24 * 60 * 60) }
    }

    async deleteFile(fileName: string) {
        await this.minioClient.removeObject(this.bucketName, fileName)
    }
}
