var objectPos : Vector3;

var objectRot : Quaternion;

var pickObj : GameObject;

var canpick = true;

var picking = false;

var guipick = false;

var pickref : GameObject;

var holdingBall = false;


function Start () {

	pickref = GameObject.FindWithTag ("pickup");

	pickObj = pickref;


}

function Update () {

	var raycheck: Ray = Camera.main.ScreenPointToRay(Input.mousePosition);

	var hitcheck: RaycastHit;

	if (Physics.Raycast(raycheck, hitcheck,10) && hitcheck.collider.gameObject.tag == "pickup"){

		guipick = true;

	}

	if (Physics.Raycast(raycheck, hitcheck) && hitcheck.collider.gameObject.tag != "pickup"){

		guipick = false;

	}

	objectPos = transform.position;

	objectRot = transform.rotation;

	if(Input.GetMouseButtonDown(0) && canpick){

		picking = true;

		var ray: Ray = 
		Camera.main.ScreenPointToRay(Input.mousePosition);

		var hit: RaycastHit;

		if (Physics.Raycast(ray, hit, 10) && hit.collider.gameObject.tag == "pickup"){

			pickObj = hit.collider.gameObject;

			hit.rigidbody.useGravity = false;

			hit.rigidbody.isKinematic = true;

			hit.collider.isTrigger = true;
			
			holdingBall = true;

			hit.transform.parent = gameObject.transform;

			hit.transform.position = objectPos;

			hit.transform.rotation = objectRot;

		}

	}

	if(Input.GetMouseButtonUp(0) && picking){

		picking = false;

		canpick = false;

	}

	if(Input.GetMouseButtonDown(0) && !canpick  && pickObj.GetComponent(pickedupobj).refusethrow != true && holdingBall){

		canpick = true;

		pickObj.rigidbody.useGravity = true;

		pickObj.rigidbody.isKinematic = false;

		pickObj.transform.parent = null;

		pickObj.collider.isTrigger = false;

		pickObj.rigidbody.AddForce (transform.forward * 500);

		pickObj = pickref;
		
		holdingBall = false;

	}

	if(Input.GetMouseButtonDown(1) && !canpick  && pickObj.GetComponent(pickedupobj).refusethrow != true){

		canpick = true;
		
		holdingBall = false;

		pickObj.rigidbody.useGravity = true;

		pickObj.rigidbody.isKinematic = false;

		pickObj.transform.parent = null;
		pickObj.collider.isTrigger = false;
		pickObj = pickref;
		
	}
}


function OnGUI () {
	GUI.Label (Rect (Screen.width/2,Screen.height/2.1,Screen.width/2,Screen.height/2), "X");

	if (guipick && canpick){
		GUI.Label (Rect (Screen.width/2,Screen.height/2,Screen.width/2,Screen.height/2), "Pick Up");
	}
}