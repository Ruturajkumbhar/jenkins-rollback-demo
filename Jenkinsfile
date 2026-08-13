pipeline {

    agent any



    environment {
        APP_DIR = "/var/www/nodeapp"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/yourusername/jenkins-rollback-demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                rm -rf ${APP_DIR}/*
                cp -r * ${APP_DIR}/
                '''
            }
        }

        stage('Stop Previous App') {
            steps {
                sh '''
                pkill node || true
                '''
            }
        }

        stage('Start Application') {
            steps {
                sh '''
                cd ${APP_DIR}
                nohup npm start > app.log 2>&1 &
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                sleep 5
                curl http://localhost:3000
                '''
            }
        }

    }

}
