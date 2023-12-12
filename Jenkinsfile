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
                    // 기존 컨테이너 제거
                    sh 'docker rm -f cabinet || true'

                    // Docker 이미지 빌드
                    sh 'docker build -t cabinet:latest -f Dockerfile .'

                    // Docker 컨테이너 실행
                    sh 'docker run -p 3000:3000 --name cabinet cabinet:latest'
                }
            }
        }

        stage('Tag and Push to Hub') {
            steps {
                echo "Tagging and pushing to hub.................."
                script {
                    withCredentials([string(credentialsId: 'docker_pwd', variable: 'docker_hub_pwd')]) {
                        def imageTag = "latest:${BUILD_NUMBER}"
                        
                        // Hub에 로그인
                        sh "docker login -u jaeae -p dmswo54899!"
                        
                        // 이미지를 허브로 푸쉬
                        sh "docker tag cabinet:latest ${imageTag}"
                        sh "docker push ${imageTag}"
                    }
                }   
            }
        }
    }
}
