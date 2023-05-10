import * as esbuild from 'esbuild';
import * as path from 'path';
import * as fs from 'fs';
import glob from 'resolve-glob';
import RawPlugin from 'esbuild-plugin-raw'

const build = async () => {

    const options = { ignore: ["**/*.test.js", "**/*.spec.js", "**/*.stories.js"] };
    const injectedScripts = glob.sync(
        [
            "./injected/**/*.ts",
            "!./node_modules/**"
        ],
        options)

    // first pass: build all the injected entrypoints
	// since those files need to be included as strings later on.
    for (let entryPoint of injectedScripts) {
        const outFile = path.resolve(path.dirname(entryPoint), path.basename(entryPoint, path.extname(entryPoint)) + '.js')
        console.log(outFile)
        await esbuild.build({
            entryPoints: [entryPoint],
            logLevel: 'error',
            bundle: true,
            outfile: outFile
        })
    }

    const extensionScripts = glob.sync(
        [
            "./src/**/*.ts",
            "!./src/types/**/*.ts",
            "!./src/injected/**/*.ts",
            "!./node_modules/**"
        ]
    )

    console.log(extensionScripts)
    await esbuild.build({
        entryPoints: extensionScripts,
        bundle: true,
        logLevel: 'error',
        inject: ['./src/window-shim.js'],
        plugins: [RawPlugin()],
        outdir: "./dist"
    })

    // copy all static files over
    const staticFiles = glob.sync([
        "./src/**/*.*",
        "!./src/**/*.ts",
        "!./src/injected/**",
        "!./src/spector.bundle.func.js",
		"!./src/window-shim.js",
    ])

    for (let staticFile of staticFiles) {
        fs.copyFileSync(staticFile, staticFile.replace("src", "dist"))
    }
}

build();