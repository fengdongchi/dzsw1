package com.shinowit.action;


import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeProStatusInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/17.
 */
public class ProStatusInfoAction extends ActionSupport {
    private String message;
    private boolean success;
    private boolean failse;
    private TMeProStatusInfo pros;
    private List<TMeProStatusInfo> list;
    @Resource
    private BaseDAO<TMeProStatusInfo> dao;

    public String insert(){
        list=dao.listAll(TMeProStatusInfo.class);
        for(TMeProStatusInfo u:list){
            if(u.getProStatusName().trim().equals(pros.getProStatusName().trim())){
                setSuccess(true);
                setFailse(false);
                setMessage("插入失败");
                return SUCCESS;
            }
        }
        dao.insert(pros);
        setFailse(true);
        setMessage("插入成功");
        setSuccess(true);
        return SUCCESS;
    }
//    public String update(){
//        list=dao.listAll(TMeProStatusInfo.class);
//        for(TMeProStatusInfo u:list){
//            if(u.getProStatusName().trim().equals(pros.getProStatusName().trim())){
//                setMessage("更新失败");
//                setSuccess(true);
//                setFailse(false);
//                return SUCCESS;
//            }
//        }
//        setFailse(true);
//        setSuccess(true);
//        setMessage("更新成功！");
//        dao.update(pros);
//        return SUCCESS;
//    }
    public String update(){
        list=dao.myfindByHql("from TMeProStatusInfo where proStatusName=?",pros.getProStatusName());
        for(TMeProStatusInfo t:list){
            if(t.getProStatusName().equals(pros.getProStatusName())){
                success=false;
                message="更新失败";
                return SUCCESS;
            }
        }
        boolean result=dao.update(pros);
        if(result==false){
            success=false;
            message="更新失败";
            return SUCCESS;
        }else{
            success=true;
            message="更新成功";
            return SUCCESS;
        }
}
    public String delete(){
        dao.delete(pros);
        setMessage("删除成功！");
        setSuccess(true);
        setFailse(true);
        return SUCCESS;
    }

    public List<TMeProStatusInfo> getList() {
        return list;
    }

    public void setList(List<TMeProStatusInfo> list) {
        this.list = list;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public TMeProStatusInfo getPros() {
        return pros;
    }

    public void setPros(TMeProStatusInfo pros) {
        this.pros = pros;
    }
}
