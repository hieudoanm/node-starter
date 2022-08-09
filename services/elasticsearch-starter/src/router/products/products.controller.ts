import { Controller, Post, Tags, Route } from 'tsoa';
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
