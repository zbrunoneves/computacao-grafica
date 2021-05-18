// Function to generate robot
// The strategy below is just a suggestion, you may change the shapes to create your customized robot

function gen_robot() {
    // Creating Group (not necessary, but better readability)
    var robot = new THREE.Group();

    // torso
    var torso = gen_rect(4, 6);
    torso.name = "torso";

    // head
    var head = gen_circle(1.6);
    head.name = "head";
    head.position.y = 4.8;
    head.position.z = -0.05;  // Not necessary, makes head not in front of other robot parts

    // left: upper arm, arm, hand
    var left_upper_arm = gen_rect(1.5, 4);
    left_upper_arm.name = "left_upper_arm";
    var left_lower_arm = gen_rect(1, 3);
    left_lower_arm.name = "lower_arm";
    var left_hand = gen_rect(1.5,0.5);
    left_hand.name = "hand";
    left_upper_arm.add(left_lower_arm);
    left_lower_arm.add(left_hand);
    left_hand.position.y = -1.5;
    left_lower_arm.position.y = -3;
    left_upper_arm.position.x = -2.6;

    // right: upper arm, arm, hand
    var right_upper_arm = left_upper_arm.clone();  
    right_upper_arm.name = "right_upper_arm";
    right_upper_arm.position.x = 2.6;

    // left: upper leg, leg, foot
    var left_upper_leg = gen_rect(1.3, 3);
    left_upper_leg.name = "left_upper_leg";

    var left_lower_leg = gen_rect(0.8, 2.2);
    left_lower_leg.name = "lower_leg";

    var left_foot = gen_rect(1.2,0.7);
    left_foot.name = "foot";

    left_upper_leg.add(left_lower_leg);
    left_lower_leg.add(left_foot);

    left_upper_leg.position.y = -4.5;
    left_upper_leg.position.x = -0.8;
    
    left_lower_leg.position.y = -2.3;

    left_foot.position.y = -1.1;

    // right: upper leg, leg, foot
    var right_upper_leg = left_upper_leg.clone();
    right_upper_leg.name = "right_upper_leg";
    right_upper_leg.position.y = -4.5;
    right_upper_leg.position.x = 0.8;

    // Creating hieararchy
    robot.add(torso);
    torso.add(right_upper_arm);
    torso.add(head);
    torso.add(left_upper_arm);

    torso.add(left_upper_leg);
    torso.add(right_upper_leg);

    robot.name = "robot";

    return robot
}


// Auxiliary function to generate rectangle
function gen_rect( width, height ) {
    var plane_geometry = new THREE.PlaneGeometry( width, height );
    var plane_material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh(plane_geometry, plane_material);

    return plane;
}

// Auxiliary function to generate circle
function gen_circle( radius, segs = 30 ) {
    var circle_geometry = new THREE.CircleGeometry( radius, segs);
    var circle_material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} );
    var circle = new THREE.Mesh(circle_geometry, circle_material);

    return circle
}

// Auxiliary function to generate triangle
function gen_triangle( size, v1 = new THREE.Vector3(-1, 0, 0), v2 = new THREE.Vector3(1, 0, 0), v3 = new THREE.Vector3(-1, 1, 0) ) {
    var triangle_geometry = new THREE.Geometry();
    var triangle = new THREE.Triangle(v1, v2, v3);
    var normal = triangle.normal();
    triangle_geometry.vertices.push(triangle.a);
    triangle_geometry.vertices.push(triangle.b);
    triangle_geometry.vertices.push(triangle.c);
    triangle_geometry.faces.push(new THREE.Face3(0, 1, 2, normal));
    var triangle = new THREE.Mesh(triangle_geometry, new THREE.MeshNormalMaterial());
    
    triangle.size = size;

    return triangle;
}