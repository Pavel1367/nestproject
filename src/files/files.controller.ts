import {
	Controller,
	Get,
	HttpCode,
	Logger,
	Post,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';
@Controller('files')
export class FilesController {
	private readonly logger = new Logger(FilesController.name);
	constructor(private readonly filesService: FilesService) {}

	@Post('upload')
	@UseInterceptors(FilesInterceptor('files'))
	@HttpCode(200)
	async uploadFiles(@UploadedFiles() files: Express.Multer.File[]): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = files.map(
			(f) => new MFile({ originalFilename: f.originalname, buffer: f.buffer }),
		);
		for (const file of files) {
			if (file.mimetype.includes('image/')) {
				const webP = await this.filesService.convertToWepP(file.buffer);
				saveArray.push(
					new MFile({ originalFilename: `${file.originalname.split('.')[0]}.webp`, buffer: webP }),
				);
			} else {
				saveArray.push({ originalFilename: file.originalname, buffer: file.buffer });
			}
		}
		return await this.filesService.saveFiles(saveArray);
	}
}
