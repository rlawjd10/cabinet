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

                    // Docker 컨테이너 실행 (백그라운드에서 실행)
                    sh 'docker run -d -p 3000:3000 --name cabinet cabinet:latest'
                }
            }
        }

        stage('Push image') {
            steps {
                script {
                    def imageTag = "${env.BUILD_NUMBER}"

                    withCredentials([string(credentialsId: 'jaeae2', variable: 'DOCKER_CREDENTIALS')]) {
                        docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_CREDENTIALS') {yy
                            // latest 태그로도 푸쉬
                            sh "docker tag cabinet:latest jaeae/cabinet:${imageTag}"
                            sh "docker push jaeae/cabinet:${imageTag}"
                        }
                    }
                }
            }
        }
    }
}
