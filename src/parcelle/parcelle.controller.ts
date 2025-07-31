import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards} from '@nestjs/common';
import { ParcelleService } from './parcelle.service';
import { CreateParcelleDto } from './dto/create-parcelle.dto';
import { UpdateParcelleDto } from './dto/update-parcelle.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('parcelle')
export class ParcelleController {
  constructor(private readonly parcelleService: ParcelleService) {}

  @Get()
  findAll() {
    return this.parcelleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parcelleService.findOne(+id);
  }

  @Roles('admin', 'technicien')
  @Post()
  create(@Body() dto: CreateParcelleDto) {
    return this.parcelleService.create(dto);
  }

  @Roles('admin', 'technicien')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateParcelleDto) {
    return this.parcelleService.update(+id, dto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parcelleService.remove(+id);
  }
}
