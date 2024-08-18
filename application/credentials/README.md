In this file, write all the credentials needed to access to your application. For example, your app and database credentials.
This information will be used by your CTO and leads to have access some components of your app. 

In addition, you should provide short tutorials to teach people how to access to all the 
components of your application. For instance, if you created a MySQL instance, you must provide 
a short description of how to use the credentials provided here to access to your database instance via ssh or 
using MySQLWorkbench. 

Points will be deducted if teams do not add their credentials here once they have chosen their 
technology stack or if their step-by-step descriptions are not clear enough. You have been warned! 

## Accessing the EC2 remote instance with SSH
Download the included Pair Key pem file.
From the terminal, in the directory which contains the downloaded key, execute the following:  
`ssh -i CSC648PairKey.pem ec2-user@ec2-44-223-28-76.compute-1.amazonaws.com`

You may have to change the permissions for the key if required, you can do this by executing:  
`chmod 400 CSC648PairKey.pem`

You should now be connected to the EC2 instance through SSH.  

## Accessing the RDS remote instance
The RDS instance is automatically connected to the EC2 instance through AWS.

Included below are the credentials for the RDS instance:  
Hostname: `csc648db.cxm460sq6jky.us-east-1.rds.amazonaws.com`  
Port: `3306`  
Username: `admin`  
Password: `concatpassword`

You can access the RDS through the command-line. First SSH into the EC2 instance as explained above.  
Then, execute the following:  `mysql -h csc648db.cxm460sq6jky.us-east-1.rds.amazonaws.com -P 3306 -u admin -p`  
Enter the password above when prompted, and you should be connected to the RDS via command-line.