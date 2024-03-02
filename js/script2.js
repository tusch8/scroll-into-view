(function () {

	const kv = document.querySelector('.js-kv'); // メイン画像
	const kvBottom = kv.clientHeight; // メイン画像の高さ
	const windowHeight = window.innerHeight; // 画面の高さ
	const startPosition = kvBottom - windowHeight; // スクロールさせる位置
	const duration = 2000; // スクロールさせる時間

	window.scrollTo(0, startPosition);

	// リロード後スクロール位置をセットする
	window.addEventListener('beforeunload', () => {
		window.scrollTo(0, startPosition);
	});

	// スクロール禁止させる関数
	const noScroll = e => {
		e.preventDefault();
	}

	// スクロールを禁止
	document.addEventListener('touchmove', noScroll, { passive: false });
	document.addEventListener('wheel', noScroll, { passive: false });


	// 自動スクロールさせる
	const autoScroll = () => {

		const startTime = new Date();
		let intervalID = setInterval(function () {
			let elapsed = new Date() - startTime;
			if (elapsed > duration) {
				clearInterval(intervalID);
				elapsed = duration;
			}
			window.scrollTo(0,  -startPosition * ((-1) * Math.cos((elapsed / duration) * Math.PI) + 1) / 2 + startPosition);
		}, 10);

	}

	// ローディング画面があるときは、ロード完了後に実行(とりあえずsetTimeoutで擬似遅延)
	setTimeout(() => {
		autoScroll();

		setTimeout(() => {
			// スクロール禁止を解除
			document.removeEventListener('touchmove', noScroll);
			document.removeEventListener('wheel', noScroll);

		}, duration);
	}, 1000);

}());
