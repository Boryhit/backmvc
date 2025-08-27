import { Router } from 'express';
import { CountryController } from '../controllers/country.controller';

const router = Router();

// Define a rota GET /countries e associa ao método getCountries do controlador.
router.get('/countries', CountryController.getCountries);

export { router as countryRouter };
