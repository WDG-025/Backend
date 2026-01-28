import { type RequestHandler } from 'express';
import formidable, { type Fields, type Files, type Part } from 'formidable';

// 10 MB
const maxFileSize = 10 * 1024 * 1024;

const filter = ({ mimetype }: Part) => {
  if (!mimetype || !mimetype.includes('image')) {
    throw new Error('Only images are allowed', { cause: { status: 400 } });
  }
  return true;
};

const formMiddleware: RequestHandler = (req, res, next) => {
  const form = formidable({ filter, maxFileSize });

  form.parse(req, (err: any, fields: Fields, files: Files) => {
    if (err) {
      next(err);
    }

    if (!files || !files.image)
      throw new Error('Please upload a file.', {
        cause: { status: 400 }
      });

    req.body = fields;
    req.image = files.image[0];
    next();
  });
};

export default formMiddleware;
