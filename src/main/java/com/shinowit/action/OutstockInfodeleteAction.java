package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.service.Outstockdelete;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/28.
 */
public class OutstockInfodeleteAction extends ActionSupport{
    private boolean success;
    private boolean failse;
    private String message;
    private String arry;
    @Resource
    private Outstockdelete outs;

    public String delete(){
        boolean status=outs.delete(arry);
        if(status){
            setMessage("该表单已被删除！");
            setSuccess(true);
            setFailse(true);
            return SUCCESS;
        }
        setFailse(false);
        setSuccess(true);
        setMessage("删除失败！");
        return SUCCESS;
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

    public String getArry() {
        return arry;
    }

    public void setArry(String arry) {
        this.arry = arry;
    }
}
