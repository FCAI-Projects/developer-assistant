import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('uploads')
export class UploadsController {
  constructor() {}

  @Get('/attachemnts/:name')
  seeUploadedFile(@Param('name') name, @Res() res: any) {
    return res.sendFile(name, { root: './uploads/attachments' });
  }

  @Get('/avatars/:name')
  seeAvatarImage(@Param('name') name, @Res() res: any) {
    if (!name || name === undefined || name === 'undefined' || name === '') {
      return res.sendFile('default.webp', { root: './uploads/avatars' });
    }
    return res.sendFile(name, { root: './uploads/avatars' });
  }
}
