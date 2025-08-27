import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { ICountry, Region } from '../models/country';

const API_URL = 'https://restcountries.com/v3.1';

export class CountryController {

//   /**
//    * Método privado para buscar todos os países da API externa.
//    * @returns {Promise<ICountry[]>} Uma promessa que resolve para um array de países.
//    */
private static async fetchAllCountries(): Promise<ICountry[]> {
    try {
      const response = await axios.get<ICountry[]>(
        `${API_URL}/all?fields=name,region,capital,population,flags`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro Axios - Código:', error.response?.status);
        console.error('Mensagem:', error.message);
        console.error('Resposta:', error.response?.data);
        throw new Error(`Erro na chamada à API: ${error.message}`);
      }
      throw new Error('Erro inesperado ao obter os dados dos países.');
    }
  }

  /**
   * Lida com a requisição GET para /countries.
   * Permite pesquisar por nome e filtrar por região usando parâmetros de query.
   * @param {Request} req O objeto de requisição do Express.
   * @param {Response} res O objeto de resposta do Express.
   * @returns {Promise<void>}
   */
  public static async getCountries(req: Request, res: Response): Promise<void> {
    try {
        console.log ('chegou até getCountries')
      const allCountries = await CountryController.fetchAllCountries();
      
      const { name, region } = req.query;

      let filteredCountries = allCountries;

      // Lógica de Pesquisa por Nome (case-insensitive, "includes")
      if (name) {
        const nameQuery = String(name).toLowerCase();
        filteredCountries = filteredCountries.filter(country =>
          country.name.common.toLowerCase().includes(nameQuery)
        );
      }

      // Lógica de Filtro por Região
      if (region) {
        const regionQuery = String(region) as Region;
        filteredCountries = filteredCountries.filter(country =>
          country.region.toLowerCase() === regionQuery.toLowerCase()
        );
      }

      res.status(200).json(filteredCountries);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}