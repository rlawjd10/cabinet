stage('Push image') {
    script {
        withCredentials([string(credentialsId: 'docker_pwd', variable: 'docker_hub_pwd')]) {
            def imageTag = "${env.BUILD_NUMBER}"
            
            docker.withRegistry('https://registry.hub.docker.com', 'jaeae') {
                // 이미지를 허브로 푸쉬
                sh "docker tag cabinet:latest cabinet:${imageTag}"
                sh "docker push cabinet:${imageTag}"
                
                // latest 태그로도 푸쉬
                sh "docker tag cabinet:latest cabinet:latest"
                sh "docker push cabinet:latest"
            }
        }
    }
}
