import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmotionsModule } from './emotions/emotions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './users/users.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [AuthModule, EmotionsModule, NotificationsModule, ResourcesModule, UsersModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
