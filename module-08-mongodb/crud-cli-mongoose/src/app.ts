import '#db';
import { Command } from 'commander';
import { Product } from '#models';

type ProductType = {
	name: string;
	price: number;
	stock: number;
	tags?: string[];
	createdAt?: Date;
	updatedAt?: Date;
};

const program = new Command();
program
	.name('ecommerce-cli')
	.description('Simple product CRUD CLI')
	.version('1.0.0');

program
	.command('list')
	.description('List all products')
	.action(async () => {
		const allProducts = await Product.find();
		console.log(allProducts);
	});

program
	.command('get')
	.description('Get product by ID')
	.argument('<id>', 'Product ID')
	.action(async (id) => {
		const product = await Product.findOne({ _id: id });
		console.log(product || 'Product not found');
	});

program
	.command('search')
	.description('Search products by tag')
	.argument('<tag>', 'Tag to search by')
	.action(async (tag) => {
		const matches = await Product.find({ tags: tag });
		console.log(matches);
	});

program
	.command('add')
	.description('Add a new product')
	.argument('<name>', 'Product name')
	.argument('<price>', 'Product price')
	.argument('<stock>', 'Stock')
	.argument('<tags>', 'Comma-seperated tags')
	.action(async (name, priceStr, stockStr, tagStr) => {
		const price = parseFloat(priceStr);
		const stock = parseInt(stockStr);
		const tags = tagStr.split(',');
		const result = await Product.insertOne({
			name,
			price,
			stock,
			tags,
		});
		console.log('Inserted with ID:', result.id);
	});

program
	.command('update')
	.description('Update a product by ID')
	.argument('<id>', 'Product ID')
	.argument('<name>', 'New name')
	.argument('<price>', 'New price')
	.argument('<stock>', 'New stock')
	.argument('<tags>', 'Comma-separated tags')
	.action(async (id, name, priceStr, stockStr, tagStr) => {
		const price = parseFloat(priceStr);
		const stock = parseInt(stockStr);
		const tags = tagStr.split(',');

		const result = await Product.updateOne(
			{ _id: id },
			{ $set: { name, price, stock, tags } }
		);

		console.log(
			result.matchedCount ? 'Product updated' : 'Product not found'
		);
	});

program
	.command('delete')
	.description('Delete a product by ID')
	.argument('<id>', 'Product ID')
	.action(async (id) => {
		const result = await Product.deleteOne({ _id: id });
		console.log(
			result.deletedCount ? 'Product deleted' : 'Product not found'
		);
	});

program.hook('postAction', () => process.exit(0));
program.parse();
