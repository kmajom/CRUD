
function getAllProduct() {
const xhr = new XMLHttpRequest();

const url = "/product";

xhr.responseType = 'json';

xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE) {
		return CreateTableFromJSON(xhr.response);
	}
};

xhr.open('GET', url, true);

xhr.send();
};

function CreateTableFromJSON(response) {
	var res = response; 
 console.log(res);
	// EXTRACT VALUE FOR HTML HEADER. 
	var col = [];
	for (var i = 0; i < res.length; i++) {
			for (var key in res[i]) {
					if (col.indexOf(key) === -1) {
							col.push(key);
					}
			}
	}

	// CREATE DYNAMIC TABLE.
	var table = document.createElement("table");

	// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
	var tr = table.insertRow(-1);                   // TABLE ROW.

	for (var i = 0; i < col.length; i++) {
			var th = document.createElement("th");      // TABLE HEADER.
			th.innerHTML = col[i];
			tr.appendChild(th);
	}

	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < res.length; i++) {

			tr = table.insertRow(-1);

			for (var j = 0; j < col.length; j++) {
					var tabCell = tr.insertCell(-1);
					tabCell.innerHTML = res[i][col[j]];
			}
			//add buttons with ID
			var updateButton = tr.insertCell(-1);
			updateButton.innerHTML = '<button onclick="redirectToUpdate(' + res[i].id + ')">UPDATE</button>';

			var deleteButton = tr.insertCell(-1);
			deleteButton.innerHTML = '<button onclick="deleteProduct(' + res[i].id + ')">DELETE</button>';
	}
	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
	var divContainer = document.getElementById("getAll");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
};

function redirectToUpdate(id) {
	window.location.href = "/productupdateform?id=" +id;
	
};
function getOneProduct() {
	//kiszedjuk az URL-bol az id-t
	const urlParams  = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	
	const xhr = new XMLHttpRequest();

	const url = "/product/" + id;

	xhr.responseType = 'json';

	

	xhr.onreadystatechange = () => {
	if (xhr.readyState === XMLHttpRequest.DONE) {		
		let res = xhr.response;
		
		document.getElementById('id').value = res.id;
		document.getElementById('name').value = res.name;
		document.getElementById('description').value = res.description;
		document.getElementById('price').value = res.price;
		document.getElementById('qty').value = res.qty;
		console.log(res.id);
		}
	};

	xhr.open('GET', url);

	xhr.send();
	
	
};

function deleteProduct(id) {
	const xhr = new XMLHttpRequest();

	const url = "/product/" + id;

	xhr.responseType = 'json';

	xhr.onreadystatechange = () => {
	if (xhr.readyState === XMLHttpRequest.DONE) {
			return xhr.response;
		}
	};

	xhr.open('DELETE', url, true);
	xhr.send();
	
	location.reload();
}
function createProduct() {
	const xhr = new XMLHttpRequest();

	const url = "/product";
	
	const formElement = document.getElementById('productForm');
	console.log(formElement);
	const formData = new FormData(formElement);
	
	const object = {};
	formData.forEach((value, key) => {object[key] = value});	
	var jsonData = JSON.stringify(object);
	/*
	const data = JSON.stringify({		
		"name": "feszület",
		"description": "ciklamen",
		"price": 5.00,
		"qty": 20
	});
	*/
	xhr.responseType = 'json';

	xhr.onreadystatechange = () => {
	if (xhr.readyState === XMLHttpRequest.DONE) {
		
		console.log(jsonData);
		
		return xhr.response;
		}
	};

	xhr.open('POST', url);
	xhr.setRequestHeader('Content-type','application/json');
	xhr.send(jsonData);

	window.location.href = "../";
}

function updateProduct() {
	const xhr = new XMLHttpRequest();
	const id = document.getElementById('id').value;

	const url = "/product/" + id;
	
	const formElement = document.getElementById('updateproductForm');
	console.log(formElement);
	const formData = new FormData(formElement);
	
	const object = {};
	formData.forEach((value, key) => {object[key] = value});	
	var jsonData = JSON.stringify(object);
	/*
	const data = JSON.stringify({		
		"name": "feszület",
		"description": "ciklamen",
		"price": 5.00,
		"qty": 20
	});
	*/
	xhr.responseType = 'json';

	xhr.onreadystatechange = () => {
	if (xhr.readyState === XMLHttpRequest.DONE) {
		
		console.log(jsonData);
		
		return xhr.response;
		}
	};

	xhr.open('PUT', url, true);
	xhr.setRequestHeader('Content-type','application/json');
	xhr.send(jsonData);

	window.location.href = "../";
}


