#!/bin/bash
pipeline {
    agent any 
	options {
    buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '3'))
	}
    environment {
        def notificationContacts = "${distro}"
		def appName = "ODOS"
		def baseURL = ""
		def appURL = "${baseURL}/${environment}/${appName}"
		def environment = "DEV"
		def emailBodyPost = ""
		def fortifySh = ""	
    }

    stages {
        stage ('Initialize') {
            steps {
				script{
					try {
						sh 'echo "PATH = ${PATH}"'
						sh 'echo "M2_HOME = ${M2_HOME}"'
						sh 'echo "ehlo"'
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }
        }
		
		stage ('Start Email') {
			steps {
				script{
					try {
						echo "send an email"
						mail to:"${notificationContacts}",
						mimeType: "text/html",
						subject:"STARTED: ${currentBuild.fullDisplayName}",
						body: "<font color=\"blue\"><strong>STARTED</strong></font>: Build started" 
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
			}
		}
		
		stage ('Build') {
			steps {
				script{
					try {
						//checkout code
						//checkout([$class: 'GitSCM', branches: [[name: '*/david-test']], extensions: [], userRemoteConfigs: [[credentialsId: 'gitAuth', url: 'https://github.com/david-sakoda/s7-ODOS-app.git']]])
						//sh 'cd keycloak'
						dir('./keycloak'){
							sh 'whoami'
							sh 'docker build -t asonadmin/odos_keycloak:$BUILD_ID --no-cache .'
						}
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
			}
		}
		
		stage ('Security Scan') {
            steps {
				script{
					try {
						
						echo "security scan"
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }
        }
		
		stage ('Deploy') {
            steps {
				script{
					try {
					  echo "commented for now"
					  //sh 'kubectl set image deployment/odos/keycloak odos/keycloak=odos/keycloak:$BUILD_ID'
					   sh 'kubectl get all'
					   //sh 'ssh jenkins@172.20.255.1 kubectl set image deployment/ciam-keycloak ciam-keycloak=ablslqbe01.msc.fema.gov:8443/ciam/ciam-keycloak:${env.BUILD_ID} --record --namespace=ciam"
					   //sh 'ssh jenkins@10.0.63.79 kubectl apply -f /path/node-deployment.yaml --kubeconfig=/path/kube.yaml'
					}
					catch (Exception e) {

						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }

        }		
		
		stage('Store Image') {
	    	steps {
		        //sh 'docker tag riskmap-keycloak:$env.BUILD_ID'
				sh 'docker tag asonadmin/odos_keycloak:$BUILD_ID asonadmin/odos_keycloak:latest'
				sh 'docker login -u "dsakoda" -p "Hong1322@" docker.io'
		      	sh 'docker push asonadmin/odos_keycloak:$BUILD_ID'
				sh 'docker push asonadmin/odos_keycloak:latest'
	      	}
		}
		
		stage ('Automation Tests') {
            steps {
				script{
					try {
						sh 'echo "Starting Automation Tests. this is a place holder"'
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }
        }
	}
	post{
		always{
			script{
				//def stageResults = ''
				//stageStatus.each{ key, val ->
				//	bat 'echo ' + key + ' : ' + val
					//stageResults += key
					//stageResults += ' : '
					//stageResults += val
					//stageResults += '<br />' 
					echo "always"
				//}
				//emailBodyPost = "<p> ${stageResults} <p> Artifacts are located <a href=\"${appURL}\">here</a>. <p> FPR located <a href=\"${env.BUILD_URL}\">here</a> "
			}
		}
		success {
            //mail to:"${notificationContacts}",
			//mimeType: "text/html",
			//subject:"SUCCESS: ${currentBuild.fullDisplayName}",
 		   // body: "<font color=\"green\"><strong>SUCCESS</strong></font>: SUCCESS <p> ${emailBodyPost}"
		   echo "success"
		}
		failure {
			///mail to:"${notificationContacts}",
			//mimeType: "text/html",
			//subject:"FAILURE: ${currentBuild.fullDisplayName}",
		    //body: "<font color=\"red\"><strong>FAILED</strong></font>: FAILURE <p> ${emailBodyPost}"
			echo "fail"
		}
	}
}