import { ValidationError } from "yup";

interface IErrors {
	[key: string]: string;
}

export default function getValidationErros(error: ValidationError): IErrors {
	const validationErrors: IErrors = {};

	error.inner.forEach((err) => {
		if (err.path) validationErrors[err.path] = err.message;
	});

	return validationErrors;
}
