
import { findPartials } from './find';
import { Transform } from 'stream';

export class ContentTransform extends Transform {
  private buffer: string = '';

  constructor(private callback: (partials: string[]) => void) {
    super();
  }

  _transform(chunk: Buffer, encoding: BufferEncoding, callback: Function): void {
    this.buffer += chunk.toString();
    callback();
  }

  _flush(callback: Function): void {
    const partials = findPartials(this.buffer);
    this.callback(partials);
    callback();
  }
}