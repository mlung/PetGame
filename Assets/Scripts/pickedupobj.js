var refusethrow = false;



function Start () {
}

function Update () {

}

function OnTriggerEnter (other : Collider) {

	if (other.gameObject.tag != "player" && other.gameObject.tag != "pickto"){ refusethrow = true;}


}

function OnTriggerExit (other : Collider) {

	if (other.gameObject.tag != "player" && other.gameObject.tag != "pickto"){ refusethrow = false;}
	
	
}