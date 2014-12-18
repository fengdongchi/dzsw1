package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TAuRoleInfo;
import com.shinowit.entity.TreeNodeCheck;
import com.shinowit.service.Roleinsert;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/12.
 */
public class RoleInsertAction extends ActionSupport{

    private TAuRoleInfo role;

    private List<TAuMenuInfo> authlist;

    private boolean success;

    private boolean failse;

    private String message;

    @Resource
    private Roleinsert roler;

    public String insert(){
        boolean result =false;
        try {
            result=roler.authinsert(role,authlist);
        }catch (Exception e){
            e.printStackTrace();
        }
        if(result==true){
            setMessage("插入成功！");
            setSuccess(true);
            setFailse(true);
            return SUCCESS;
        }else{
            setFailse(false);
            setSuccess(true);
            setMessage("插入失败,请重新插入");
            return SUCCESS;
        }

    }


    public TAuRoleInfo getRole() {
        return role;
    }

    public void setRole(TAuRoleInfo role) {
        this.role = role;
    }

    public List<TAuMenuInfo> getAuthlist() {
        return authlist;
    }

    public void setAuthlist(List<TAuMenuInfo> authlist) {
        this.authlist = authlist;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isFailse() {
        return failse;
    }

    public void setFailse(boolean failse) {
        this.failse = failse;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
