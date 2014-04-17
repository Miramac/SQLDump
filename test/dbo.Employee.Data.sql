INSERT INTO dbo.Employee ( ID,FirstName,LastName,DOB)
SELECT 1,'First1','Last1','Fri Apr 08 1983 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)'
UNION ALL
SELECT 2,'First2','Last2','Sun Apr 08 1984 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)'
UNION ALL
SELECT 3,'First3','',null
