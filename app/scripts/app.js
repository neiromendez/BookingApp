/*
 Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function (document) {
	'use strict';

	// Grab a reference to our auto-binding template
	// and give it some initial binding values
	// Learn more about auto-binding templates at http://goo.gl/Dx1u2g
	var app = document.querySelector('#app');
	app.users = [];
	app.searchValue = '';

	app.displayInstalledToast = function () {
		// Check to make sure caching is actually enabled—it won't be in the dev environment.
		if (!document.querySelector('platinum-sw-cache').disabled) {
			document.querySelector('#caching-complete').show();
		}
	};

	// Listen for template bound event to know when bindings
	// have resolved and content has been stamped to the page
	app.addEventListener('dom-change', function () {
		console.log('Our app is ready to rock!');
		app.users = app.generateUsers(5);
	});

	// See https://github.com/Polymer/polymer/issues/1381
	window.addEventListener('WebComponentsReady', function () {
		// imports are loaded and elements have been registered
	});

	// Close drawer after menu item is selected if drawerPanel is narrow
	app.onDataRouteClick = function () {
		var drawerPanel = document.querySelector('#paperDrawerPanel');
		if (drawerPanel.narrow) {
			drawerPanel.closeDrawer();
		}
	};

	// Scroll page to top and expand header
	app.scrollPageToTop = function () {
		document.getElementById('mainContainer').scrollTop = 0;
	};

	app.clearSearch = function () {
		app.searchValue = '';
	};

	app.generateUsers = function (n) {
		var data = [];

		for (var i = 0; i < n; i++) {
			data.push({
				uid: faker.random.uuid(),
				avatar: faker.internet.avatar(),
				name: faker.name.firstName() + ' ' + faker.name.lastName(),
				suffix: faker.name.jobArea(),
				background: faker.image.image(),
				color: {
					begin: faker.internet.color(),
					end: faker.internet.color()
				}
			});
		}

		return data;
	};

	app._getUrl = function (uid) {
		return '/users/' + uid;
	};

	app._getUser = function (uid) {
		return app.users.filter(function (user) {
			return user.uid === uid;
		})[0];
	};
})(document);
