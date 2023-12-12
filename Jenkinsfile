pipeline {
    agent any
    
    stages {
        stage('Build and Run Docker Image') {
            steps {
                script {
                    // Docker 이미지 빌드
                    dockerImage = docker.build('cabinet:latest', '-f Dockerfile .')

                    // Docker 컨테이너 실행
                    dockerImage.run('-p 3000:3000', '--name cabinet')
                }
            }
        }

        stage('Test Project') {
            steps {
                // 여기에 테스트 단계 추가
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // 빌드 완료 후 Docker 컨테이너 종료
            script {
                sh 'docker stop cabinet || true'
            }
        }
    }
}
