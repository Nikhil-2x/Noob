pipeline {

```
agent any

environment {
    IMAGE_NAME = "localhostnick/express-proj"
}

stages {

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Build Docker Image') {
        steps {
            sh """
            docker build \
            -t ${IMAGE_NAME}:${BUILD_NUMBER} \
            -t ${IMAGE_NAME}:latest .
            """
        }
    }

    stage('Push Docker Image') {
        steps {

            withCredentials([
                usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )
            ]) {

                sh '''
                echo $DOCKER_PASS | docker login \
                -u $DOCKER_USER \
                --password-stdin

                docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                docker push ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    stage('Deploy To Kubernetes') {
        steps {

            sh """
            kubectl set image deployment/express-proj \
            express-mandar-container=${IMAGE_NAME}:${BUILD_NUMBER}

            kubectl rollout status deployment/express-proj
            """
        }
    }

    stage('Verify Deployment') {
        steps {

            sh '''
            kubectl get pods

            kubectl get deployment express-proj

            echo "Deployment Verified"
            '''
        }
    }
}

post {

    success {
        echo 'Pipeline completed successfully'
    }

    failure {
        echo 'Pipeline failed'
    }
}
```

}
