pipeline {
    agent any

    stages {
        stage('clone') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/EunjaeJo/cabinet.git']])
            }
        }

        stage('Build and Run Docker Image') {
            steps {
                script {
                    // Docker 이미지 빌드
                    sh 'docker build -t cabinet:latest -f Dockerfile .'

                    // Docker 컨테이너 실행
                    sh 'docker run -p 3000:3000 --name cabinet cabinet:latest'
                }
            }
        }

        stage('Push image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker_pwd', variable: 'docker_hub_pwd')]) {
                        def imageTag = "${env.BUILD_NUMBER}"
                        
                        docker.withRegistry('https://registry.hub.docker.com', 'docker_hub_credentials') {
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
        }
    }
}
