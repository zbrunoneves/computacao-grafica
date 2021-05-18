function PlayGuitar() {}

Object.assign( PlayGuitar.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/6 }, 500)
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
            .to( {theta:-Math.PI/1.2 }, 700)
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
            .repeat(3)
            .yoyo(true);

        let upperLeftArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/6 }, 500)
            .onUpdate(function(){
                let left_upper_arm =  robot.getObjectByName("left_upper_arm");
                let  [x, y, z]  = [left_upper_arm.position.x, left_upper_arm.position.y, left_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                left_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(-this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                left_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })

        let lowerLeftArmTween = new TWEEN.Tween( {theta:Math.PI/6} )
            .to( {theta:Math.PI/5 }, 500)
            .onUpdate(function(){
                let left_upper_arm =  robot.getObjectByName("left_upper_arm").getObjectByName("lower_arm");
                let  [x, y, z]  = [left_upper_arm.position.x, left_upper_arm.position.y, left_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                left_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(-this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                left_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })
        
        let lowerLeftArmTweenBack = new TWEEN.Tween( {theta:Math.PI/5} )
            .to( {theta:0}, 500)
            .onUpdate(function(){
                let left_upper_arm =  robot.getObjectByName("left_upper_arm").getObjectByName("lower_arm");
                let  [x, y, z]  = [left_upper_arm.position.x, left_upper_arm.position.y, left_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                left_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(-this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                left_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })
            .delay(2000);

        let upperLeftArmTweenBack = new TWEEN.Tween( {theta:Math.PI/6} )
            .to( {theta:0 }, 500)
            .onUpdate(function(){
                let left_upper_arm =  robot.getObjectByName("left_upper_arm");
                let  [x, y, z]  = [left_upper_arm.position.x, left_upper_arm.position.y, left_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                left_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(-this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                left_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            }).delay(2000);

        let upperArmTweenBack = new TWEEN.Tween( {theta:Math.PI/6} )
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

        let lowerArmTweenBack = new TWEEN.Tween( {theta:-Math.PI/1.2} )
            .to( {theta: 0}, 700)
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
       
        lowerArmTween.start();
        upperArmTween.start(); 
        lowerArmTween.chain(upperArmTweenBack);
        
        upperLeftArmTween.start();
        lowerLeftArmTween.start();
        lowerLeftArmTween.chain(lowerLeftArmTweenBack,upperLeftArmTweenBack);
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






