import { Controller, Post, Route, Tags } from '@hieudoanm/express';
import { createProducts, searchProducts } from './products.service';

@Tags('Products')
@Route('products')
export class ElasticSearchController extends Controller {
  @Post()
  async createProducts() {
    return createProducts();
  }

  @Post('search')
  async searchProducts() {
    return searchProducts();
  }
}
