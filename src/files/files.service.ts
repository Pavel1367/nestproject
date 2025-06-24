import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';
@Injectable()
export class FilesService {
	async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);
		const res: FileElementResponse[] = [];
		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalFilename}`, file.buffer);
			res.push({
				url: `${dateFolder}/${file.originalFilename}`,
				name: file.originalFilename,
			});
		}
		return res;
	}

	async convertToWepP(file: Buffer) {
		return sharp(file).webp().toBuffer();
	}
}
