package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.*;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.websocket.Session;
import java.util.List;

/**
 * Created by Administrator on 2014/12/2.
 */
public class MenulistInfopageAction extends ActionSupport{

    private String username;

    private List<TAuAuthorization> menulist;

    @Resource
    private BaseDAO<TAuAuthorization> authdao;

    @Resource
    private BaseDAO<TAuOperInfo> operdao;

    public String select(){

        try{

            List<TAuOperInfo> operlist=operdao.myfindByHql("from TAuOperInfo a where a.operName=?",username);
            for(TAuOperInfo oper : operlist){

                String ss = oper.getTAuRoleInfoByRoleId().getRoleId();

                menulist=authdao.myfindByHql("from TAuAuthorization u where u.TAuRoleInfoByRoleId.roleId=?",ss);
            }
        }catch(Exception e){
            e.printStackTrace();
        }

        return SUCCESS;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<TAuAuthorization> getMenulist() {
        return menulist;
    }

    public void setMenulist(List<TAuAuthorization> menulist) {
        this.menulist = menulist;
    }
}
