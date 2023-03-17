import * as esbuild from 'esbuild';
import * as path from 'path';
import glob from 'resolve-glob';
import RawPlugin from 'esbuild-plugin-raw'

const build = async () => {

	const options = {ignore: ["**/*.test.js", "**/*.spec.js", "**/*.stories.js"]};
	const injectedScripts = glob.sync(
	  [
		"./injected/**/*.ts",
		"!./node_modules/**"
	  ],
	  options)
	
	// first pass: build all the injected entrypoints
	for (let entryPoint of injectedScripts) {
		const outFile = path.resolve(path.dirname(entryPoint), path.basename(entryPoint, path.extname(entryPoint)) + '.js')
		console.log(outFile)
		await esbuild.build({
			entryPoints: [entryPoint],
			bundle: true,
			outfile: outFile
		})
	}

	const extensionScripts = glob.sync(
		[
			"./**/*.ts",
			"!./injected/**/*.ts",
			"!./node_modules/**"
		]
	)

	for (let entryPoint of extensionScripts) {
		const outFile = path.resolve(path.dirname(entryPoint), path.basename(entryPoint, path.extname(entryPoint)) + '.js')
		console.log(outFile)
		await esbuild.build({
			entryPoints: [entryPoint],
			bundle: true,
			inject: ['./window-shim.js'],
			plugins: [RawPlugin()],
			outfile: outFile
		})
	}
}

build();