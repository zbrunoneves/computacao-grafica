function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2 }, 500)
            .onUpdate(function(){
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let  [x, y, z]  = [right_upper_arm.position.x, right_upper_arm.position.y, right_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                right_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                right_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })

        let lowerArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2 }, 500)
            .onUpdate(function(){
                let right_lower_arm =  robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");
                let  [x, y, z]  = [right_lower_arm.position.x, right_lower_arm.position.y, right_lower_arm.position.z]; 
                let pivot = {x:0, y:1.5, z:0}

                right_lower_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                right_lower_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })

        let handTween = new TWEEN.Tween( {theta:Math.PI} )
            .to( {theta:Math.PI-0.3 }, 200)
            .onUpdate(function(){
                let right_hand =  robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm").getObjectByName("hand");
                let  [x, y, z]  = [right_hand.position.x, right_hand.position.y, right_hand.position.z]; 

                right_hand.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )

                    right_hand.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })
        
        let handTweenBack = new TWEEN.Tween( {theta:Math.PI-0.3} )
            .to( {theta:Math.PI }, 200)
            .onUpdate(function(){
                let right_hand =  robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm").getObjectByName("hand");
                let  [x, y, z]  = [right_hand.position.x, right_hand.position.y, right_hand.position.z]; 

                right_hand.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )

                    right_hand.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })
            .delay(200)

        let lowerArmTweenBack = new TWEEN.Tween( {theta:Math.PI/2} )
            .to( {theta:0 }, 500)
            .onUpdate(function(){
                let right_lower_arm =  robot.getObjectByName("right_upper_arm").getObjectByName("lower_arm");
                let  [x, y, z]  = [right_lower_arm.position.x, right_lower_arm.position.y, right_lower_arm.position.z]; 
                let pivot = {x:0, y:1.5, z:0}

                right_lower_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                right_lower_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })

        let upperArmTweenBack = new TWEEN.Tween( {theta:Math.PI/2} )
            .to( {theta:0 }, 500)
            .onUpdate(function(){
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let  [x, y, z]  = [right_upper_arm.position.x, right_upper_arm.position.y, right_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                right_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                right_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })


        upperArmTween.chain(lowerArmTween);
        lowerArmTween.chain(handTween);
        handTween.chain(handTweenBack);
        handTweenBack.chain(lowerArmTweenBack);
        lowerArmTweenBack.chain(upperArmTweenBack);
        upperArmTween.start();    
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});




