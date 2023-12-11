# InCa-Template



## Template

Este template es para ejemplificar la conexión entre una app InCA y el backend.


## Conexión

-  Editar el string de conexión en storage.js


```
        logInEndpointUrl: "http://127.0.0.1:8000/account/login/",
        entryEndpointUrl: "http://127.0.0.1:8000/logs/entries/",
        logCreateEndpointUrl: "http://127.0.0.1:8000/logs/",
        logOutEndpointUrl: "http://127.0.0.1:8000/account/logout/",
```



## Enviar Entrada de Log



```
async function doPost (body) {
	if (params.isLoggedIn == true) {

	let test_number = log.test_number;
	const SERVER_URL = params.entryEndpointUrl;
	const headers = {
	'Content-Length': body.length,
	'Content-Type': 'application/json',
	'Authorization': `Token ${params.userToken}`,
	};

	const res = await fetch(SERVER_URL, {
		method: 'POST',
		headers,
		body
	});
	}
}

```

## Body


```
const body = JSON.stringify({
			hour,
			c0,
			c1,
			c2,
			c3,
			c4,
			test_name,
			result,
			log: params.logId,
			response_time:rt_json,
			other,
		})

```
# dms-project
