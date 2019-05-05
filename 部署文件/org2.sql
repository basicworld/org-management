SELECT id,org_name,org_fullname,orgcode9,orgcode18,game_mode,game_stage,test_ip,test_key,pro_ip,pro_key,address,reg_date,note FROM organization WHERE is_delete!=TRUE ORDER BY reg_date DESC, id DESC LIMIT 10;

INSERT INTO organization(org_name,org_fullname,orgcode9,orgcode18,game_mode,game_stage,test_ip,pro_ip,address,reg_date,note)
VALUES('百度','百度有限公司','123456789','112233441234567890',1,2,'1.1.1.1','2.2.2.2','北京市海淀区','2019-04-24','会员机构');