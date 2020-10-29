$(document).ready(function () {
	const loadTable = function (data, skipRetweets) {
		if (skipRetweets) {
			let newData = [];
			for (let i = 0; i < data.length; i++) {
				console.log(data[i][4]);
				if (data[i][4].includes('RT ')) continue;
				newData.push(data[i]);
			}
			data = newData;
		}

		$('#tweet-table').DataTable({
			data: data,
			columns: [
				{ title: 'Timestamp', data: 'timestamp' },
				{ title: 'Day', data: 'day' },
				{ title: 'Time', data: 'time' },
				{ title: 'User', data: 'user' },
				{ title: 'Tweet', data: 'text' },
				{ title: 'Retweets', data: 'retweets' },
				{ title: 'Favorites', data: 'favorites' },
			],
			order: [[0, 'desc']],
			scrollY: '80vh',
			scrollCollapse: true,
			paging: false,
			columnDefs: [
				{ type: 'time', targets: 0 },
				{ visible: false, targets: 0 },
				{ orderable: false, targets: [1, 2, 4] },
				{ orderSequence: ['desc', 'asc', ''], targets: [5, 6] },
				{ orderSequence: ['asc', 'desc', ''], targets: [3] },
			],
		});

		$('*[linkify]').each(function () {
			$(this).html(
				$(this)
					.html()
					.replace(
						/((?:https?)[^\s]+)/gi,
						'<a target="_blank" href="$1">$1</a>'
					)
			);
		});
	};

	fetch('formatted_data.json')
		.then((response) => response.json())
		.then((data) => {
			loadTable(data);

			$('#skip-retweets').click(function () {
				$('#tweet-table').DataTable().destroy();
				loadTable(data, true);
			});
		});
});
