SELECT id,org_name,org_fullname,orgcode9,orgcode18,game_mode,game_stage,test_ip,test_key,pro_ip,pro_key,address,reg_date,note FROM organization WHERE is_delete!=TRUE ORDER BY reg_date DESC, id DESC LIMIT 10;

INSERT INTO organization(org_name,org_fullname,orgcode9,orgcode18,game_mode,game_stage,test_ip,pro_ip,address,reg_date,note)
VALUES('百度','百度有限公司','123456789','112233441234567890',1,2,'1.1.1.1','2.2.2.2','北京市海淀区','2019-04-24','会员机构');

SELECT pi.proIntCount, pw.proWebCount, ti.testIntCount, tw.testWebCount, 
pi.proIntCount + pw.proWebCount  AS  proTotalCount,
ti.testIntCount + tw.testWebCount AS testTotalCount,
pi.proIntCount + ti.testIntCount  AS  intCount,
pw.proWebCount  + tw.testWebCount AS webCount,
pi.proIntCount + pw.proWebCount + ti.testIntCount + tw.testWebCount AS totalCount
 FROM (
(SELECT COUNT(*) AS proIntCount FROM organization o WHERE o.game_stage=3 AND o.game_mode=2) pi,
(SELECT COUNT(*) AS proWebCount FROM organization o WHERE o.game_stage=3 AND o.game_mode=1) pw,
(SELECT COUNT(*) AS testIntCount FROM organization o WHERE o.game_stage=2 AND o.game_mode=2) ti,
(SELECT COUNT(*) AS testWebCount FROM organization o WHERE o.game_stage=2 AND o.game_mode=1) tw);

SELECT id, org_id AS orgId, s_name AS name, s_position AS position, s_email AS email, s_note AS note  FROM contact WHERE is_delete != 1 AND org_id=47;

INSERT INTO contact(org_id, s_name, s_position, s_phone, s_email, s_note)
VALUES (47, '李四2','经理','123456','abc@123.com','ci负责人');