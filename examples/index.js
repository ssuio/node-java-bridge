const path = require('path');

function loadSample() {
	const jarPath = ['./Main.jar'];
	const jarBridge = require('../lib/jar-bridge');
	jarBridge.load(jarPath, {sync: true})
	.then((api) => {
		console.log('---- Instance ----');
		console.log(api.Base);
		var b1 = new api.Base();
		console.log(b1.call('my arg'));

		console.log('---- End of Instance ----');

		console.log('---- Static Methods ----');
		console.log(api.Main.Foo());
		console.log('---- End of Static Methods ----');

	}, (err) => {
		console.log('Error');
		console.log(err);
	})
	.catch((err) => {
		console.log('---- Catch ----');
		console.log(err);
	});
}
function loadModuleSample() {
	const jarClassLoader = require('../lib/jar-class-loader');
	jarClassLoader.addClassPath('./Main.jar');
	var Main = jarClassLoader.loadJarModuleAsync('com/example/api/Main');
	console.log(Main);
	Main.Foo()
	.then((output) => {
		console.log(output);
	});
	Main.Foo('asdsad')
	.then((output) => {
		console.log(output);
	});

	console.log('---- dumpMethods ----');
	console.log(jarClassLoader.getClassMethods('com.example.api.instance.Concrete'));
	console.log('---- End of dumpMethods ----');
}

//loadSample();
loadModuleSample();