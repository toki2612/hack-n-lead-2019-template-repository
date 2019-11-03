# [Hack n Lead 2019](https://womenplusplus.ch/hacknlead)

====

DataPreprocessing folder: (Mathematica and R)
- Take the raw data from the Data folder, given for the challenge: large.csv
- Preprocess it with Mathematica using the file 01_fraude_DataProcessing.nb  --> largeD19.csv
- Preprocess it with R using the file 02_fraude_DataProcessing.R --> largeD21.csv


Analysis folder: (R)
- CreditSuisseChallengeAnalysis.Rmd can be used to produce the file with R: CreditSuisseChallengeAnalysis.html which will give an overview of all features and a simple threshold approach to detect anomalies.

ML folder: (Python)
- HacknLead_credit_swiss.ipynb a Jupyter Notebook for Python computations. Load the data into the ML folder and run the notebook. There will be results on supervised and unsupervised learning algorithms.

All data analysis files are available here - https://polybox.ethz.ch/index.php/s/hOamDfvbRGxJQRm or https://drive.google.com/drive/folders/15FFdiuOBnFtjDZJ6rZaJ3p7dVyDuIaF7?usp=sharing

User Interface: (Typescript + React)
- In /client folder run `yarn install`, to run the app `yarn start`

Prototype is also available online: http://aml.netlify.com/

