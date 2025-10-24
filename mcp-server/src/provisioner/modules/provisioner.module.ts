import { Module } from '@nestjs/common';
import { ProvisionerService } from '../services/provisioner.service';

@Module({
  providers: [ProvisionerService],
  exports: [ProvisionerService],
  controllers: [],
})
export class ProvisionerModule {}