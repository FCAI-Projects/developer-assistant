import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('uploads')
export class UploadsController {
  constructor() {}

  @Get('/attachemnts/:name')
  seeUploadedFile(@Param('name') name, @Res() res: any) {
    return res.sendFile(name, { root: './uploads/attachments' });
  }
}
