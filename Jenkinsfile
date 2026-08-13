pipeline {

    agent any

   
    environment {
        APP_DIR = "/var/www/nodeapp"
        APP_NAME = "nodeapp"
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
                    url: 'https://github.com/RuturajKumbhar/jenkins-rollback-demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm install
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    mkdir -p ${APP_DIR}

                    rm -rf ${APP_DIR}/*

                    cp -r . ${APP_DIR}/

                    cd ${APP_DIR}

                    # Don't copy Jenkins/Git files to production
                    rm -rf .git
                '''
            }
        }

        stage('PM2 Stop Previous App') {
            steps {
                sh '''
                    pm2 stop ${APP_NAME} || true
                    pm2 delete ${APP_NAME} || true
                '''
            }
        }

        stage('PM2 Start Application') {
            steps {
                sh '''
                    cd ${APP_DIR}

                    pm2 start npm \
                        --name "${APP_NAME}" \
                        -- start

                    pm2 save
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    sleep 5

                    pm2 status

                    curl --fail http://localhost:3000
                '''
            }
        }

    }

    post {
        success {
            echo 'Deployment successful!'
            sh 'pm2 status'
        }

        failure {
            echo 'Deployment failed!'
            sh 'pm2 status || true'
        }
    }
}
