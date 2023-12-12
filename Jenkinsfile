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
                    sh 'docker build -t jaeae/cabinet:latest -f Dockerfile .'

                    // Docker 컨테이너 실행 (백그라운드에서 실행)
                    sh 'docker run -d -p 3000:3000 --name cabinet jaeae/cabinet:latest'
                }
            }
        }

        stage('Push image to Docker Hub') {
            steps {
                script {
                        docker.withRegistry('https://index.docker.io/v1/', 'jaeae') {
                            sh "docker push jaeae/cabinet"
                        }
                    
                }
            }
        }
    }
}
