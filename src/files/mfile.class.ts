export class MFile {
	originalFilename: string;
	buffer: Buffer<ArrayBufferLike>;
	constructor(file: Express.Multer.File | MFile) {
		this.buffer = file.buffer;
		this.originalFilename = 'originalFilename' in file ? file.originalFilename : file.originalname;
	}
}
