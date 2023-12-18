pipeline {
    agent any
    
    // 환경 변수 정의
    environment {
        PROJECT_ID = 'rising-daylight-382112'
        CLUSTER_NAME = 'kube'
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = 'gke_rising-daylight-382112_asia-northeast3-a_kube'
    }
    
    stages {
        // 소스 코드 체크아웃 단계
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }

        // Docker 이미지 빌드 단계
        stage("Build Image") {
            steps {
                script {
                    // Docker 이미지를 빌드하고 변수 'myapp'에 할당
                    myapp = docker.build("jaeae/cabinet:${env.BUILD_ID}")
                }
            }
        }

        // Docker Hub에 이미지 푸시 단계
        stage("Push image to Docker Hub") {
            steps {
                script {
                    // Docker 레지스트리에 로그인하고 이미지를 푸시
                    docker.withRegistry('https://index.docker.io/v1/', 'jaeae') {
                        myapp.push("latest")
                        myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }

        // GKE(Google Kubernetes Engine)에 배포하는 단계
        stage('Deploy to GKE') {
            when {
                // 브랜치가 'master'일 때만 실행
                branch 'master'
            }
            steps {
                // deployment.yaml 파일 내의 이미지 태그를 빌드 ID로 치환
                sh "sed -i 's/cabinet:latest/cabinet:${env.BUILD_ID}/g' deployment.yaml"
                
                // KubernetesEngineBuilder를 사용하여 GKE에 배포
                step([$class: 'KubernetesEngineBuilder', 
                      projectId: env.PROJECT_ID, 
                      clusterName: env.CLUSTER_NAME, 
                      location: env.LOCATION, 
                      manifestPattern: 'deployment.yaml', 
                      credentialsId: env.CREDENTIALS_ID, 
                      verifyDeployments: false])
            }
        } 
    }
}
