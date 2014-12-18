package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TAuRoleInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/19.
 */
@Service
public class Roleupdate {

    @Resource
    private BaseDAO<TAuRoleInfo> roledao;

    @Resource
    private BaseDAO<TAuAuthorization> authdao;

    public boolean authupdate(TAuRoleInfo roleinfo, List<TAuMenuInfo> menuInfo) {
        boolean result = false;
        Object obj=roledao.update(roleinfo);
        authdao.executeHQL("delete from TAuAuthorization where TAuRoleInfoByRoleId.roleId=?",roleinfo.getRoleId());
        if(obj!=null){
            for (TAuMenuInfo ss : menuInfo) {
                TAuAuthorization ta = new TAuAuthorization();
                ta.setIsEnabled(true);
                ta.setTAuRoleInfoByRoleId(roleinfo);
                ta.setTAuMenuInfoByMenuId(ss);
                authdao.insert(ta);
            }
            result = true;
        }
        return result;

    }
}
